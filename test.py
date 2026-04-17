import requests
data = {
  "capacity": 18,
  "items": [
    {"id": "1", "name": "TV", "type": "fixed", "weight": 10, "value": 80},
    {"id": "2", "name": "Gold Dust", "type": "fractional", "weight": 6, "value": 60},
    {"id": "3", "name": "Silver Pot", "type": "fixed", "weight": 5, "value": 20}
  ]
}
resp = requests.post("http://127.0.0.1:5000/api/solve", json=data)
print(resp.status_code, resp.text)
