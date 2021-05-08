from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.exceptions import ValidationError

from .models import Destination
from .serializer import NearestCitySerializer


class NearestCityViewSet(viewsets.ModelViewSet):
    queryset = Destination.objects.all()
    serializer_class = NearestCitySerializer

    def get_queryset(self):

        longitude = self.request.query_params.get("long")
        latitude = self.request.query_params.get("lat")

        if longitude is not None and latitude is not None:
            queryset = self.queryset.filter(longitude=longitude, latitude=latitude)
            return queryset
        else:
            raise ValidationError(
                {
                    "message": "One or more required parameters are missing. lat and long are required."
                }
            )
