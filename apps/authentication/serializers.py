from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class RegisterSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ("id", "full_name", "email", "password")

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value.lower()

    def create(self, validated_data):
        full_name = validated_data.pop("full_name")
        first_name, _, last_name = full_name.partition(" ")
        user = User.objects.create_user(
            username=validated_data["email"],
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=first_name,
            last_name=last_name,
        )
        return user


class LoginSerializer(TokenObtainPairSerializer):
    username_field = "email"

    def validate(self, attrs):
        self.user = authenticate(username=attrs.get("email"), password=attrs.get("password"))
        if self.user is None:
            raise serializers.ValidationError("Invalid email or password.")
        refresh = self.get_token(self.user)
        data = {"refresh": str(refresh), "access": str(refresh.access_token)}
        data["user"] = UserSerializer(self.user).data
        return data


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ("id", "full_name", "email")

    def get_full_name(self, obj):
        return obj.get_full_name() or obj.email
