from rest_framework import serializers
from sports.models import Sport
from .models import Event, Review, EventGroup
from django.contrib.auth import get_user_model
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sport
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class EventSerializer (serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class PopulatedReviewSerializer(ReviewSerializer):
    owner = UserSerializer()


class PopulatedEventSerializer(EventSerializer):
    sport = SportSerializer()
    reviews = PopulatedReviewSerializer(many=True)
    owner = UserSerializer()
    # group = PopulatedEventGroupSerializer(many=True)

# Check if below are correct


class EventGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventGroup
        fields = '__all__'


class PopulatedEventGroupSerializer(EventGroupSerializer):
    members = UserSerializer(many=True)
    event = PopulatedEventSerializer()
    owner = UserSerializer()
