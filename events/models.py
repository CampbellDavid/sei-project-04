from django.db import models


class Event(models.Model):
    title = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    sport = models.CharField(max_length=50)
    user = models.CharField(max_length=50)  # needs to reflect user model
    review = models.CharField(max_length=50)
    time_and_date = models.CharField(max_length=50)
    # needs to reflect t & d model

    def __str__(self):
        return self.title
