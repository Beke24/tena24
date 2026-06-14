from django.conf import settings
from django.db import models


class ChatHistory(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="chat_history")
    message = models.TextField()
    response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("created_at",)

