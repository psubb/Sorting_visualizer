import os
from flask import Blueprint, request, jsonify, render_template
from .sorting_algorithms import bubble_sort, insertion_sort, merge_sort, quick_sort

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/sort', methods=['POST'])
def sort():
    data = request.json
    array = data['array']
    algorithm = data['algorithm']

    if algorithm == 'bubble':
        steps = bubble_sort(array)
    elif algorithm == 'insertion':
        steps = insertion_sort(array)
    elif algorithm == 'merge':
        steps = merge_sort(array)
    elif algorithm == 'quick':
        steps = quick_sort(array)
    else:
        return jsonify({'error': 'Invalid algorithm'}), 400

    return jsonify({'steps': steps})
