from rest_framework.permissions import BasePermission

from api.utils.permissions import validate_permissions


class UserPermission(BasePermission):
    """
    validates permissions configured on view exist for user in request
    """

    def has_permission(self, request, view):
        return validate_permissions(view.permissions, request.user.username)


