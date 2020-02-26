from django.db import models

# Create your models here.


class Sport(models.Model):
    name = models.CharField(max_length=50)
    image = models.CharField(max_length=500)
    events = models.ManyToManyField(
        'events.Event', related_name='sports', blank=True)  # check if correct

    def __str__(self):
        return self.name
