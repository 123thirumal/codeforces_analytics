# serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User  # Make sure to import User from Django's auth module

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {'password': {'write_only': True}}  # Hide password from API responses

    def create(self, validated_data):
        user = User(**validated_data)  # Create a user instance
        user.set_password(validated_data['password'])  # Hash the password
        user.save()  # Save the user instance
        return user  # Return the created user instance

