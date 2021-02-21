import boto3

from rest_framework import viewsets, parsers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User

from api.permissions.user_permissions import UserPermission
from api.serializers.user import UserSerializer
from api.serializers.permission import PermissionSerializer
from api.serializers.token import MyTokenObtainPairSerializer
from api.models import Permission
from api.utils.permissions import validate_permissions


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    parser_class = parsers.JSONParser


@api_view(['POST'])
def logout_view(request):
    client = boto3.client('dynamodb')

    response = client.delete_item(
        TableName='user_permissions',
        Key={
            'username': {
                'S': request.data.get('username')
            },
        }
    )

    return Response(status=response['ResponseMetadata']['HTTPStatusCode'])


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class PermissionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing Permissions.
    """
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
    permission_classes = [UserPermission, IsAuthenticated]
    permissions = ['view_perms']


@api_view(['POST'])
def validate_permission_view(request):
    valid = validate_permissions([request.data.get('permission')], request.data.get('username'))

    return Response(data={'valid': valid})
