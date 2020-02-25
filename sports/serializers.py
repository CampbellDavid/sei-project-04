from rest_framework import serializers
from events.models import Event
from .models import Sport


class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = ('id', 'title')


class SportSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sport
        fields = ('id', 'name', 'image', 'events')


class PopulatedSportSerializer(SportSerializer):
    events = EventSerializer(many=True)
