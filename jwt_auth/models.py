from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.CharField(max_length=40, unique=True)
    profile_image = models.CharField(max_length=500, blank=True)
    wish_list = models.ManyToManyField(
        'events.Event', related_name='users', blank=True)
