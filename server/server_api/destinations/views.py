from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.exceptions import ValidationError

from .models import Destination
from .serializer import CitySerializer, RecommendedCitySerializer
from .utils import get_closest_city, get_recommended_cities
from geopy import distance
import random
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


class RecommendedCitiesViewSet(viewsets.ModelViewSet):
    queryset = Destination.objects.all()
    serializer_class = RecommendedCitySerializer

    def get_queryset(self):
        city_id = self.request.query_params.get("id")
        is_warmer = self.request.query_params.get("warm")
        month = self.request.query_params.get("mon")
        is_cheaper = self.request.query_params.get("cheap")
        is_safer = self.request.query_params.get("safe")
        less_populated = self.request.query_params.get("pop")
        is_close_to_city = self.request.query_params.get("close")

        month = self.request.query_params.get("mon")
        if (
            city_id is not None
            and is_warmer is not None
            and month is not None
            and is_cheaper is not None
            and is_safer is not None
            and less_populated is not None
            and is_close_to_city is not None
        ):
            return get_recommended_cities(
                self.queryset,
                city_id,
                is_warmer,
                month,
                is_cheaper,
                is_safer,
                less_populated,
                is_close_to_city,
            )

        else:
            raise ValidationError(
                {"message": "One or more required parameters are missing."}
            )
