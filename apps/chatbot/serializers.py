from rest_framework import serializers

from .models import ChatHistory


class ChatRequestSerializer(serializers.Serializer):
    message = serializers.CharField()


class ChatHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatHistory
        fields = ("id", "message", "response", "created_at")

