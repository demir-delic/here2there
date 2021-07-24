from geopy import distance

import random


def get_distance_between_coordinates(coords1, coords2):
    distance_between_coordinates = distance.great_circle(coords1, coords2).kilometers

    return distance_between_coordinates


def get_nearest_city(queryset, latitude, longitude):
    distance_to_nearest_city = 1000000000
    nearest_city = ""

    for city in queryset:
        distance_between_cities = get_distance_between_coordinates(
            (city.latitude, city.longitude), (latitude, longitude)
        )
        if distance_between_cities < distance_to_nearest_city:
            distance_to_nearest_city = distance_between_cities
            nearest_city = city.city_id

    filtered_queryset = queryset.filter(city_id=nearest_city)

    return filtered_queryset


def get_recommended_cities(
    queryset,
    city_id,
    is_warmer,
    month,
    is_cheaper,
    is_safer,
    less_populated,
    is_close_to_city,
):

    current_city_queryset = queryset.filter(city_id=city_id)

    filter_by_weather = []
    filter_by_living_cost = []
    filter_by_safety = []
    filter_by_population = []
    filter_by_proximity = []

    months = {
        "1": "wx_jan",
        "2": "wx_feb",
        "3": "wx_mar",
        "4": "wx_apr",
        "5": "wx_may",
        "6": "wx_jun",
        "7": "wx_jul",
        "8": "wx_aug",
        "9": "wx_sep",
        "10": "wx_oct",
        "11": "wx_nov",
        "12": "wx_dec",
    }

    for current_city in current_city_queryset:
        for city in queryset:
            if is_warmer:
                if getattr(city, months[month]) > getattr(current_city, months[month]):
                    filter_by_weather.append(city.city_id)
            else:
                if getattr(city, months[month]) < getattr(current_city, months[month]):
                    filter_by_weather.append(city.city_id)

            if is_cheaper:
                if city.living_cost < current_city.living_cost:
                    filter_by_living_cost.append(city.city_id)
            else:
                if city.living_cost > current_city.living_cost:
                    filter_by_living_cost.append(city.city_id)

            if is_safer:
                if city.safety > current_city.safety:
                    filter_by_safety.append(city.city_id)
            else:
                if city.safety < current_city.safety:
                    filter_by_safety.append(city.city_id)

            if less_populated:
                if city.population < current_city.population:

                    filter_by_population.append(city.city_id)
            else:
                if city.population > current_city.population:
                    filter_by_population.append(city.city_id)

            distance_between_cities = get_distance_between_coordinates(
                (city.latitude, city.longitude),
                (current_city.latitude, current_city.longitude),
            )

            if is_close_to_city:
                if (
                    distance_between_cities < 1000
                ) and city.city_id != current_city.city_id:
                    filter_by_proximity.append(city.city_id)
            else:
                if (
                    distance_between_cities > 1000
                ) and city.city_id != current_city.city_id:
                    filter_by_proximity.append(city.city_id)

    matches = {}

    for id in filter_by_population:
        if id in matches:
            matches[id] += 1
        else:
            matches[id] = 1

    for id in filter_by_weather:
        if id in matches:
            matches[id] += 1
        else:
            matches[id] = 1

    for id in filter_by_safety:
        if id in matches:
            matches[id] += 1
        else:
            matches[id] = 1

    for id in filter_by_proximity:
        if id in matches:
            matches[id] += 1
        else:
            matches[id] = 1

    for id in filter_by_living_cost:
        if id in matches:
            matches[id] += 1
        else:
            matches[id] = 1

    matched_queryset = []

    for id in matches:
        if matches[id] == 5:
            matched_queryset.append(id)

    if not matched_queryset or len(matched_queryset) < 2:
        for id in matches:
            if matches[id] == 4:
                matched_queryset.append(id)

    if not matched_queryset:
        for id in matches:
            if matches[id] == 3:
                matched_queryset.append(id)

    random_recommended_queryset = []

    for i in range(3):
        random_city = random.choice(matched_queryset)
        random_recommended_queryset.append(random_city)

    filtered_queryset = queryset.filter(city_id__in=random_recommended_queryset)

    return filtered_queryset
