from rest_framework_json_api.serializers import ModelSerializer

from django.contrib.auth.models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
