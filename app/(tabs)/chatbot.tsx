import { axios_instanace, requests_url } from '@/api/axios';
import CustomButton from '@/components/CustomButton';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';

export interface Chat_Message {
  role: "system" | "user" | "assistant",
  content: string,
}

export default function ChatbotScreen() {
  const [messages, setMessages] = useState<Chat_Message[]>([]);
  const [question, setQuestion] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const flatListRef = useRef<FlatList>(null);

  const handle_request = async (question: string) => {
    try {
      setLoading(true);
      const response = await axios_instanace.post(requests_url.chatbot, { content: question });

      if (response.status === 201) {
        //alert(response.data.message);

        const answer: string = response.data.data;
        console.log("answer", answer);
        setMessages(messages => [
          ...messages,
          { role: "user", content: question },
          { role: "assistant", content: answer },
        ])
        //setAnswer(answer); // 메세지 답변만 나옴.
        setQuestion('');
        setLoading(false);
      }

    } catch (error) {
      console.error("챗봇 질문 요청 중 오류 발생", error);
    }
    finally {
      setLoading(false);
    }
  }

  const load_history = async () => {
    try {
      const response = await axios_instanace.get(requests_url.chatbot);

      if (response.status === 200) {
        //alert(response.data.message);
        const history: Chat_Message[] = response.data.data;
        setMessages(history);

      }
    } catch (error) {
      console.error("챗봇 질의응답 조회 중 오류 발생", error);
    }

  }

  const onChangeText = (input_text: string) => {
    setQuestion(input_text);
  }

  useEffect(() => {
    load_history();
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, []);


  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })} // 데이터가 추가되면 자동 이동
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })} // 리스트가 처음 로드될 때 자동 이동
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.role === "user" ? styles.userBubble : styles.botBubble]}>
            <Text style={item.role === "user" ? styles.questionText : styles.answerText}>{item.content}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={question}
          onChangeText={onChangeText}
          placeholder="질문을 입력하세요"
        />
        <CustomButton title='전송' onPress={() => handle_request(question)} loading={loading} />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "70%",
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#009aff",
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#e5e5ea",
  },
  questionText: {
    color: "#fff"
  },
  answerText: {
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  sendButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#007aff",
    borderRadius: 5,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});



