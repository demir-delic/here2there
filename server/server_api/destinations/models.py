from django.db import models


class Destination(models.Model):
    """
    Destination Model
    Defines attributes of a city
    """

    city_id = models.CharField(primary_key=True, max_length=255)
    city = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    living_cost = models.DecimalField(max_digits=15, decimal_places=6)
    safety = models.DecimalField(max_digits=15, decimal_places=6)
    population = models.IntegerField()
    longitude = models.DecimalField(max_digits=15, decimal_places=6)
    latitude = models.DecimalField(max_digits=15, decimal_places=6)
    teleport_url = models.TextField()
    city_summary = models.TextField()
    img_url = models.TextField()
    wx_jan = models.DecimalField(max_digits=15, decimal_places=6)
    wx_feb = models.DecimalField(max_digits=15, decimal_places=6)
    wx_mar = models.DecimalField(max_digits=15, decimal_places=6)
    wx_apr = models.DecimalField(max_digits=15, decimal_places=6)
    wx_may = models.DecimalField(max_digits=15, decimal_places=6)
    wx_jun = models.DecimalField(max_digits=15, decimal_places=6)
    wx_jul = models.DecimalField(max_digits=15, decimal_places=6)
    wx_aug = models.DecimalField(max_digits=15, decimal_places=6)
    wx_sep = models.DecimalField(max_digits=15, decimal_places=6)
    wx_oct = models.DecimalField(max_digits=15, decimal_places=6)
    wx_nov = models.DecimalField(max_digits=15, decimal_places=6)
    wx_dec = models.DecimalField(max_digits=15, decimal_places=6)

    def __str__(self):
        return self.city
