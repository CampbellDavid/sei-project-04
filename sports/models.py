from django.db import models

# Create your models here.


class Sport(models.Model):
    name = models.CharField(max_length=50)
    image = models.CharField(max_length=500)
    events = models.CharField(max_length=500)

    def __str__(self):
        return self.name
