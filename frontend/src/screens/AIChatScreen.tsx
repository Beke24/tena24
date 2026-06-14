import { useState } from "react";
import { Alert, Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { AppInput } from "../components/AppInput";
import { Screen } from "../components/Screen";
import { sendChat } from "../services/wellness";

type Message = { role: "user" | "assistant"; text: string };

export function AIChatScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const send = async () => {
    if (!input.trim()) return;
    const userText = input;
    setInput("");
    setMessages((items) => [...items, { role: "user", text: userText }]);
    try {
      const reply = await sendChat(userText);
      setMessages((items) => [...items, { role: "assistant", text: reply.response }]);
    } catch {
      Alert.alert("Chat failed", "Check the backend connection.");
    }
  };

  return (
    <Screen>
      <Text style={{ fontSize: 28, fontWeight: "800" }}>AI Wellness Assistant</Text>
      {messages.map((message, index) => (
        <View key={`${message.role}-${index}`} style={{ alignSelf: message.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%", backgroundColor: message.role === "user" ? "#146C5C" : "#fff", borderRadius: 8, padding: 12 }}>
          <Text style={{ color: message.role === "user" ? "#fff" : "#1E2723" }}>{message.text}</Text>
        </View>
      ))}
      <AppInput label="Message" value={input} onChangeText={setInput} placeholder="I am stressed" />
      <AppButton title="Send" onPress={send} />
    </Screen>
  );
}
