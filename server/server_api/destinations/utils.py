from geopy import distance


def get_closest_city(queryset, latitude, longitude):
    distance_to_nearest_city = 10000000000000
    nearest_city = ""

    for city in queryset:
        city_coordinates = (city.latitude, city.longitude)
        param_coordinates = (latitude, longitude)
        distance_between_cities = distance.distance(
            city_coordinates, param_coordinates
        ).kilometers
        if distance_between_cities < distance_to_nearest_city:
            distance_to_nearest_city = distance_between_cities
            nearest_city = city.city_id

    filtered_queryset = queryset.filter(city_id=nearest_city)

    return filtered_queryset
