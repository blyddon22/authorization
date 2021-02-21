from django.contrib import admin
from django.urls import path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView

import api.views as views

router = routers.SimpleRouter(trailing_slash=False)
router.register(r'users', views.UserViewSet)
router.register(r'permissions', views.PermissionViewSet)

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view()),
    path('login/refresh/', TokenRefreshView.as_view()),
    path('logout/', views.logout_view),
    path('validate-permission/', views.validate_permission_view),
    path('admin/', admin.site.urls),
]

urlpatterns += router.urls
