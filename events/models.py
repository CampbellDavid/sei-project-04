#pylint: disable=no-member

from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth import get_user_model
User = get_user_model()


class Event(models.Model):
    title = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    sport = models.CharField(max_length=50)  # One to many field
    # user = models.CharField(max_length=50)  # needs to reflect user model
    review = models.CharField(max_length=50)
    time_and_date = models.CharField(max_length=50)
    # needs to reflect t & d model

    def __str__(self):
        return self.title


class Review(models.Model):
    text = models.CharField(max_length=300)
    rating = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)])
    event = models.ForeignKey(
        Event, related_name='reviews', null=True, on_delete=models.CASCADE)
    owner = models.ForeignKey(
        User, related_name='reviews', null=True, on_delete=models.CASCADE)

    def __str__(self):
        return f'Review {self.id} on {self.event}'
