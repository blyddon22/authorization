from django.db import models
from django.contrib.auth.models import User


class Permission(models.Model):
    user = models.ManyToManyField(User)
    code = models.CharField(max_length=50)
    system = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
