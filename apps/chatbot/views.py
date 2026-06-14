import os

import requests
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ChatHistory
from .serializers import ChatHistorySerializer, ChatRequestSerializer


def wellness_reply(message):
    text = message.lower()
    if os.getenv("OPENAI_API_KEY"):
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers={"Authorization": f"Bearer {os.getenv('OPENAI_API_KEY')}", "Content-Type": "application/json"},
            json={
                "model": os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
                "messages": [
                    {"role": "system", "content": "You are Tena360 AI, giving brief affordable wellness guidance for Ethiopia."},
                    {"role": "user", "content": message},
                ],
                "temperature": 0.4,
            },
            timeout=30,
        )
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]
    if "sleep" in text:
        return "Try a 4-4-6 breathing cycle, reduce phone use before bed, and choose a light dinner like shiro with vegetables."
    if "stress" in text:
        return "Pause for two breathing cycles, drink water, take a short walk, and write down the next one practical task."
    if "food" in text or "healthy" in text:
        return "For affordable nutrition, combine injera with lentils or shiro, add cabbage, and use eggs when your budget allows."
    return "Focus on one small wellness action today: balanced food, movement, sleep, or breathing. Tell me what feels hardest."


class ChatView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ChatRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        message = serializer.validated_data["message"]
        reply = wellness_reply(message)
        chat = ChatHistory.objects.create(user=request.user, message=message, response=reply)
        return Response(ChatHistorySerializer(chat).data, status=status.HTTP_201_CREATED)

