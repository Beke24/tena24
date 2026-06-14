from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import HealthProfile
from .serializers import HealthProfileSerializer


class HealthProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile = HealthProfile.objects.filter(user=request.user).first()
        if not profile:
            return Response(None)
        return Response(HealthProfileSerializer(profile).data)

    def post(self, request):
        profile = HealthProfile.objects.filter(user=request.user).first()
        serializer = HealthProfileSerializer(profile, data=request.data, partial=bool(profile))
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data)

