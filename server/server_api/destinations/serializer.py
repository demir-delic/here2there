from rest_framework import serializers
from .models import Destination


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = ("city_id", "city", "country")


class RecommendedCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = (
            "city_id",
            "img_url",
            "city",
            "country",
            "city_summary",
            "teleport_url",
        )
