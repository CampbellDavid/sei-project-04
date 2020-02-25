# pylint: disable=no-member

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Sport
from .serializers import PopulatedSportSerializer


class SportListView(APIView):
    def get(self, _request):
        sports = Sport.objects.all()
        serialized_sports = PopulatedSportSerializer(sports, many=True)
        return Response(serialized_sports.data)
