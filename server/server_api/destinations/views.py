from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.exceptions import ValidationError

from .models import Destination
from .serializer import CitySerializer
from .utils import get_closest_city
from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache

# Serve Single Page Application
index = never_cache(TemplateView.as_view(template_name="index.html"))


class CityViewSet(viewsets.ModelViewSet):
    queryset = Destination.objects.all().order_by("city_id")
    serializer_class = CitySerializer


class NearestCityViewSet(viewsets.ModelViewSet):
    queryset = Destination.objects.all()
    serializer_class = CitySerializer

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
