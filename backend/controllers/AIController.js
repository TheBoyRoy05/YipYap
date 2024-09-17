import { HfInference } from "@huggingface/inference";

export const getTopics = async (req, res) => {
  try {
    const inference = new HfInference(process.env.HUGGING_FACE_API_TOKEN);

    const messages = req.body.messages.join(", ");
    const prompt = [
      {
        role: "user",
        content: `Based on the following conversation, suggest 3 responses to continue the discussion, keep each response short:\n\n${messages}`,
      },
    ];

    let generatedText = "";
    for await (const chunk of inference.chatCompletionStream({
      model: "mistralai/Mistral-Nemo-Instruct-2407",
      messages: prompt,
      max_tokens: 500,
    })) {
      generatedText += chunk.choices[0]?.delta?.content || "";
    }

    const responses = generatedText
      .split("\n")
      .slice(0, 3)
      .map((res) =>
        res.split('"').length > 1
          ? res.slice(res.indexOf('"') + 1, res.lastIndexOf('"')) || res
          : res
      );

    res.json(responses);
  } catch (error) {
    console.error("Error in getTopics controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
