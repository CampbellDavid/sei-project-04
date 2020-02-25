# pylint: disable=no-member

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import EventSerializer

from .models import Event


class EventListView(APIView):
    def get(self, _request):
        events = Event.objects.all()
        serialized_events = EventSerializer(events, many=True)

        return Response(serialized_events.data)


class EventDetailView(APIView):

    def get(self, _request, pk):

        event = Event.objects.get(pk=pk)
        serialized_event = EventSerializer(event)

        return Response(serialized_event.data)
