from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/solve', methods=['POST'])
def solve():
    data = request.json
    capacity = int(data.get('capacity', 0))
    items = data.get('items', [])
    
    n = len(items)
    # Standard 0/1 Knapsack DP
    # dp[i][w] will be the max value with first i items and capacity w
    dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        item = items[i-1]
        w = int(item.get('weight', 0))
        v = int(item.get('value', 0))
        for cw in range(capacity + 1):
            if w <= cw:
                dp[i][cw] = max(v + dp[i-1][cw - w], dp[i-1][cw])
            else:
                dp[i][cw] = dp[i-1][cw]
                
    # Backtrack to find which items were included
    best_items = []
    cw = capacity
    for i in range(n, 0, -1):
        if dp[i][cw] != dp[i-1][cw]:
            item = items[i-1]
            # Add fraction: 1.0 for 0/1 items for frontend compatibility
            item_copy = dict(item)
            item_copy['fraction'] = 1.0
            best_items.append(item_copy)
            cw -= int(item.get('weight', 0))
            
    return jsonify({
        'maxValue': dp[n][capacity],
        'items': best_items
    })


if __name__ == '__main__':
    app.run(debug=True, port=5000)
