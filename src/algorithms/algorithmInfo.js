// 算法信息映射表
// 包含所有算法的中英文名称、原理、功能、时空复杂度、适用范围和伪代码等信息

const algorithmInfo = {
  'bubble': {
    chineseName: '冒泡排序',
    englishName: 'Bubble Sort',
    description: '一种简单的排序算法，它重复地遍历要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。',
    principle: '重复遍历数组，比较相邻元素并交换位置，使较大元素逐渐"冒泡"到数组末尾。',
    functionality: '适用于小规模数据集的排序',
    timeComplexity: '最好: Ω(n), 平均: Θ(n²), 最坏: O(n²)',
    spaceComplexity: 'O(1)',
    applicableRange: '数据量小且基本有序的情况',
    pseudocode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // 冒泡排序实现
    // 外层循环控制排序轮数，需要进行n-1轮
    for (int i = 0; i < n-1; i++) {
        // 内层循环进行相邻元素比较和交换
        // 每轮排序后，最大的元素会冒泡到末尾，所以范围逐渐减小
        for (int j = 0; j < n-i-1; j++) {
            // 如果前一个元素大于后一个元素，则交换它们
            if (arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }
    
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    
    return 0;
}`
  },
  'selection': {
    chineseName: '选择排序',
    englishName: 'Selection Sort',
    description: '一种简单直观的排序算法，它的工作原理是每一次从待排序的数据元素中选出最小（或最大）的一个元素，存放到序列的起始位置，直到全部待排序的数据元素排完。',
    principle: '在未排序序列中找到最小元素，存放到排序序列的起始位置，然后再从剩余未排序元素中继续寻找最小元素，然后放到已排序序列的末尾。',
    functionality: '适用于小规模数据集的排序',
    timeComplexity: '最好: Ω(n²), 平均: Θ(n²), 最坏: O(n²)',
    spaceComplexity: 'O(1)',
    applicableRange: '数据规模不大，对稳定性没有要求的情况',
    pseudocode: `#include <iostream>
#include <vector>
using namespace std;

    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // 选择排序实现
    // 外层循环控制排序轮数，需要进行n-1轮
    for (int i = 0; i < n-1; i++) {
        // 假设当前位置i就是最小值的位置
        int minIndex = i;
        
        // 内层循环在未排序部分查找真正的最小值
        for (int j = i+1; j < n; j++) {
            // 如果找到更小的元素，更新最小值索引
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // 如果最小值不在当前位置i，则交换元素
        if (minIndex != i) {
            swap(arr[i], arr[minIndex]);
        }
    }
    
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    return 0;
}`
  },
  'insertion': {
    chineseName: '插入排序',
    englishName: 'Insertion Sort',
    description: '一种简单直观的排序算法，通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。',
    principle: '将数组分为已排序和未排序两部分，每次未排序部分取第一个元素，插入到已排序部分的适当位置。',
    functionality: '适用于小规模或基本有序的数据集',
    timeComplexity: '最好: Ω(n), 平均: Θ(n²), 最坏: O(n²)',
    spaceComplexity: 'O(1)',
    applicableRange: '数据量较小或基本有序的情况',
    pseudocode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // 插入排序实现
    // 从第二个元素开始，逐个将未排序元素插入到已排序部分
    for (int i = 1; i < n; i++) {
        // 当前要插入的元素
        int key = arr[i];
        // 已排序部分的最后一个元素的索引
        int j = i - 1;
        
        // 在已排序部分从后向前查找插入位置
        // 如果已排序元素大于key，则向后移动
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        
        // 将key插入到正确位置
        arr[j + 1] = key;
    }
    
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    
    return 0;
}`
  },
  'quick': {
    chineseName: '快速排序',
    englishName: 'Quick Sort',
    description: '一种高效的排序算法，采用分治法策略来把一个序列分为较小和较大的两个子序列，然后递归地排序两个子序列。',
    principle: '选择一个基准元素，通过一趟排序将待排序序列分成两部分，其中一部分记录的关键字均比基准元素小，另一部分记录的关键字均比基准元素大，然后分别对这两部分记录继续进行排序。',
    functionality: '适用于大规模数据集的排序',
    timeComplexity: '最好: Ω(n log n), 平均: Θ(n log n), 最坏: O(n²)',
    spaceComplexity: 'O(log n)',
    applicableRange: '大规模数据集，对平均性能要求较高',
    pseudocode: `#include <iostream>
#include <vector>
using namespace std;

// 分区函数：将数组分为两部分，左边小于基准，右边大于基准
int partition(vector<int>& arr, int low, int high) {
    // 选择最后一个元素作为基准
    int pivot = arr[high];
    // i指向小于基准的元素区域的边界
    int i = low - 1;
    
    // 遍历数组，将小于基准的元素移到左边
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    
    // 将基准元素放到正确位置
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

// 快速排序主函数
void quickSort(vector<int>& arr, int low, int high) {
    // 递归终止条件：当low >= high时，表示子数组只有一个或零个元素
    if (low < high) {
        // 获取分区点
        int pi = partition(arr, low, high);
        
        // 递归排序分区点左边的子数组
        quickSort(arr, low, pi - 1);
        
        // 递归排序分区点右边的子数组
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // 调用快速排序函数
    quickSort(arr, 0, n - 1);
    
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    
    return 0;
}`
  },
  'merge': {
    chineseName: '归并排序',
    englishName: 'Merge Sort',
    description: '一种采用分治法的稳定排序算法，将已有序的子序列合并，得到完全有序的序列。',
    principle: '将数组分成两半，递归地对每一半进行排序，然后将两个已排序的部分合并成一个完整的排序数组。',
    functionality: '适用于大规模数据集的排序，是稳定的排序算法',
    timeComplexity: '最好: Ω(n log n), 平均: Θ(n log n), 最坏: O(n log n)',
    spaceComplexity: 'O(n)',
    applicableRange: '对稳定性有要求的大规模数据集',
    pseudocode: `#include <iostream>
#include <vector>
using namespace std;

// 合并两个已排序的子数组
void merge(vector<int>& arr, int left, int mid, int right) {
    // 计算两个子数组的长度
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    // 创建临时数组存储两个子数组
    vector<int> L(n1), R(n2);
    
    // 复制数据到临时数组
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
    
    // 初始化三个索引变量，分别指向左子数组、右子数组和合并后的数组
    int i = 0, j = 0, k = left;
    
    // 合并两个子数组到原数组中
    while (i < n1 && j < n2) {
        // 比较两个子数组的元素，将较小的元素放入原数组
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    // 复制左子数组剩余元素
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    // 复制右子数组剩余元素
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

// 归并排序主函数
void mergeSort(vector<int>& arr, int left, int right) {
    // 递归终止条件：当left >= right时，表示子数组只有一个或零个元素
    if (left < right) {
        // 计算中点，避免溢出
        int mid = left + (right - left) / 2;
        
        // 递归排序左半部分
        mergeSort(arr, left, mid);
        
        // 递归排序右半部分
        mergeSort(arr, mid + 1, right);
        
        // 合并两个已排序的部分
        merge(arr, left, mid, right);
    }
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // 调用归并排序函数
    mergeSort(arr, 0, n - 1);
    
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    
    return 0;
}`
  },
  'heap': {
    chineseName: '堆排序',
    englishName: 'Heap Sort',
    description: '一种基于比较的排序算法，利用堆这种数据结构设计的排序算法。',
    principle: '将待排序序列构造成一个大顶堆，此时整个序列的最大值就是堆顶的根节点。将其与末尾元素进行交换，此时末尾就为最大值。然后将剩余n-1个元素重新构造成一个堆，这样会得到n个元素的次小值。如此反复执行，便能得到一个有序序列。',
    functionality: '适用于大规模数据集的排序',
    timeComplexity: '最好: Ω(n log n), 平均: Θ(n log n), 最坏: O(n log n)',
    spaceComplexity: 'O(1)',
    applicableRange: '大规模数据集，对空间复杂度有要求',
    pseudocode: `#include <iostream>
#include <vector>
using namespace std;

// 调整堆结构，使其满足大顶堆性质
void heapify(vector<int>& arr, int n, int i) {
    // 初始化最大值索引为根节点
    int largest = i;
    // 计算左右子节点索引
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    // 如果左子节点存在且大于根节点，则更新最大值索引
    if (left < n && arr[left] > arr[largest])
        largest = left;
    
    // 如果右子节点存在且大于当前最大值，则更新最大值索引
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    // 如果最大值不是根节点，则交换并继续调整受影响的子树
    if (largest != i) {
        swap(arr[i], arr[largest]);
        // 递归调整受影响的子树
        heapify(arr, n, largest);
    }
}

// 堆排序主函数
void heapSort(vector<int>& arr) {
    int n = arr.size();
    
    // 构建初始大顶堆，从最后一个非叶子节点开始
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    // 逐个从堆顶取出元素放到数组末尾，并重新调整堆
    for (int i = n - 1; i >= 0; i--) {
        // 将堆顶元素（最大值）与末尾元素交换
        swap(arr[0], arr[i]);
        // 重新调整剩余元素构成的堆
        heapify(arr, i, 0);
    }
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // 调用堆排序函数
    heapSort(arr);
    
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    
    return 0;
}`
  },
  'shell': {
    chineseName: '希尔排序',
    englishName: 'Shell Sort',
    description: '插入排序的一种更高效的改进版本，也称为递减增量排序算法。',
    principle: '把记录按下标的一定增量分组，对每组使用直接插入排序算法排序；随着增量逐渐减少，每组包含的关键词越来越多，当增量减至1时，整个文件恰被分成一组，算法便终止。',
    functionality: '适用于中等规模数据集的排序',
    timeComplexity: '最好: Ω(n log n), 平均: Θ(n log²n), 最坏: O(n²)',
    spaceComplexity: 'O(1)',
    applicableRange: '中等规模数据集，对插入排序的改进',
    pseudocode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // 希尔排序实现
    // 初始增量为数组长度的一半，每次减半
    for (int gap = n / 2; gap > 0; gap /= 2) {
        // 对每个分组进行直接插入排序
        for (int i = gap; i < n; i++) {
            // 当前要插入的元素
            int temp = arr[i];
            int j;
            
            // 在分组内进行插入排序
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
                arr[j] = arr[j - gap];
            
            // 将temp插入到正确位置
            arr[j] = temp;
        }
    }
    
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    
    return 0;
}`
  },
  'counting': {
    chineseName: '计数排序',
    englishName: 'Counting Sort',
    description: '一种非比较排序算法，适用于一定范围内的整数排序。',
    principle: '使用一个额外的数组，其中第i个元素是待排序数组中值等于i的元素的个数，然后根据这个数组来排序。',
    functionality: '适用于范围较小的整数排序',
    timeComplexity: '最好: Ω(n + k), 平均: Θ(n + k), 最坏: O(n + k)',
    spaceComplexity: 'O(k)',
    applicableRange: '数据范围较小的整数排序',
    pseudocode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // 计数排序实现
    // 找到数组中的最大值和最小值，确定计数数组的范围
    int max = *max_element(arr.begin(), arr.end());
    int min = *min_element(arr.begin(), arr.end());
    int range = max - min + 1;
    
    // 创建计数数组和输出数组
    vector<int> count(range, 0);
    vector<int> output(n);
    
    // 统计每个元素出现的次数
    for (int i = 0; i < n; i++)
        count[arr[i] - min]++;
    
    // 计算累积计数，确定每个元素在输出数组中的位置
    for (int i = 1; i < range; i++)
        count[i] += count[i - 1];
    
    // 从后向前遍历原数组，根据计数数组确定元素位置
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    // 将排序后的结果复制回原数组
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
    
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    
    return 0;
}`
  },
  'radix': {
    chineseName: '基数排序',
    englishName: 'Radix Sort',
    description: '一种非比较型整数排序算法，其原理是将整数按位数切割成不同的数字，然后按每个位数分别比较。',
    principle: '从最低位开始，对每一位进行计数排序，直到最高位排序完成。',
    functionality: '适用于位数较少的整数排序',
    timeComplexity: '最好: Ω(nk), 平均: Θ(nk), 最坏: O(nk)',
    spaceComplexity: 'O(n + k)',
    applicableRange: '位数较少的整数排序',
    pseudocode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// 对数组arr按照指定位数exp进行计数排序
void countingSort(vector<int>& arr, int exp) {
    int n = arr.size();
    // 创建输出数组和计数数组
    vector<int> output(n);
    vector<int> count(10, 0);
    
    // 统计当前位上各数字(0-9)出现的次数
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;
    
    // 计算累积计数，确定每个数字在输出数组中的位置
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];
    
    // 从后向前遍历原数组，根据计数数组确定元素位置
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    
    // 将排序后的结果复制回原数组
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}

// 基数排序主函数
void radixSort(vector<int>& arr) {
    // 找到数组中的最大值，以确定最大位数
    int max = *max_element(arr.begin(), arr.end());
    
    // 从个位开始，对每一位进行计数排序
    for (int exp = 1; max / exp > 0; exp *= 10)
        countingSort(arr, exp);
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // 调用基数排序函数
    radixSort(arr);

    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    
    return 0;
}`
  },
  'bogo': {
    chineseName: '猴子排序',
    englishName: 'Bogo Sort',
    description: '一种非常低效的排序算法，也称为随机排序或愚人排序。',
    principle: '通过随机打乱数组直到它被排序为止。',
    functionality: '理论上可以排序任何数组，但实际效率极低',
    timeComplexity: '最好: Ω(n), 平均: Θ((n+1)!), 最坏: O(∞)',
    spaceComplexity: 'O(1)',
    applicableRange: '仅作为教学示例，不适用于实际应用',
    pseudocode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <random>
using namespace std;

// 检查数组是否已排序
bool isSorted(vector<int>& a) {
    for (int i = 0; i < a.size() - 1; i++) {
        if (a[i] > a[i + 1]) return false;
    }
    return true;
}

// 随机打乱数组
void shuffle(vector<int>& a) {
    random_device rd;
    mt19937 g(rd());
    std::shuffle(a.begin(), a.end(), g);
}

// 猴子排序主函数
void bogoSort(vector<int>& a) {
    while (!isSorted(a)) shuffle(a);
}

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    
    // 调用猴子排序函数
    bogoSort(a);
    
    for (int i = 0; i < a.size(); i++) {
        cout << a[i] << " ";
    }
    
    return 0;
}`
  }
};

export default algorithmInfo;