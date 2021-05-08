from rest_framework import serializers
from .models import Destination


class NearestCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = ("city", "country")
