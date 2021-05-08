from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.exceptions import ValidationError

from .models import Destination
from .serializer import CitySerializer, NearestCitySerializer
from .utils import get_closest_city


class CityViewSet(viewsets.ModelViewSet):
    queryset = Destination.objects.all().order_by("city_id")
    serializer_class = CitySerializer


class NearestCityViewSet(viewsets.ModelViewSet):
    queryset = Destination.objects.all()
    serializer_class = NearestCitySerializer

    def get_queryset(self):
        latitude = self.request.query_params.get("lat")
        longitude = self.request.query_params.get("long")

        if latitude is not None and longitude is not None:
            return get_closest_city(self.queryset, latitude, longitude)

        else:
            raise ValidationError(
                {
                    "message": "One or more required parameters are missing. lat and long are required."
                }
            )
