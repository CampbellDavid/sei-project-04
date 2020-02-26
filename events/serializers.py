from rest_framework import serializers
from sports.models import Sport
from .models import Event, Review, Group
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
    sports = SportSerializer(many=True)
    reviews = PopulatedReviewSerializer(many=True)

# Check if below are correct


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class PopulatedGroupSerializer(GroupSerializer):
    owner = UserSerializer()
    members = UserSerializer()
