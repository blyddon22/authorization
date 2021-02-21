import boto3
import datetime

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from api.models import Permission


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        perms = Permission.objects.filter(user__username=user.username)

        client = boto3.client('dynamodb')
        client.put_item(
            TableName='user_permissions',
            Item={
                'username': {
                    'S': user.username
                },
                'created': {
                    'S': str(datetime.datetime.now())
                },
                'perms': {
                    'L': [{'S': p.code} for p in perms]
                }
            }
        )

        token['lookup_key'] = user.username

        return token
