def bubble_sort(arr):
    steps = []
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
            steps.append(arr.copy())
    return steps

def insertion_sort(arr):
    steps = []
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
        steps.append(arr.copy())
    return steps

def merge_sort(arr):
    steps = []
    def merge_sort_recursive(arr, l, r):
        if l < r:
            m = l + (r - l) // 2
            merge_sort_recursive(arr, l, m)
            merge_sort_recursive(arr, m + 1, r)
            merge(arr, l, m, r)
            steps.append(arr.copy())

    def merge(arr, l, m, r):
        n1 = m - l + 1
        n2 = r - m
        L = arr[l:l + n1]
        R = arr[m + 1:m + 1 + n2]
        i = j = 0
        k = l
        while i < n1 and j < n2:
            if L[i] <= R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
        while i < n1:
            arr[k] = L[i]
            i += 1
            k += 1
        while j < n2:
            arr[k] = R[j]
            j += 1
            k += 1

    merge_sort_recursive(arr, 0, len(arr) - 1)
    return steps

def quick_sort(arr):
    steps = []
    def quick_sort_recursive(arr, low, high):
        if low < high:
            pi = partition(arr, low, high)
            quick_sort_recursive(arr, low, pi - 1)
            quick_sort_recursive(arr, pi + 1, high)
            steps.append(arr.copy())

    def partition(arr, low, high):
        pivot = arr[high]
        i = low - 1
        for j in range(low, high):
            if arr[j] < pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        return i + 1

    quick_sort_recursive(arr, 0, len(arr) - 1)
    return steps
