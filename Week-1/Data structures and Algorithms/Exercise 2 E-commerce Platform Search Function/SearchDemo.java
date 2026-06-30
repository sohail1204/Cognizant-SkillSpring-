package exercise2_ecommerceplatformsearch;

public class SearchDemo {
    public static int linearSearch(Product[] products, String key) {
        for (int i = 0; i < products.length; i++) {
            if (products[i].productName.equalsIgnoreCase(key)) {
                return i;
            }
        }
        return -1;
    }
    public static int binarySearch(Product[] products, String key) {
        int low = 0;
        int high = products.length - 1;
        while (low <= high) {
            int mid = (low + high) / 2;
            int compare = products[mid].productName.compareToIgnoreCase(key);
            if (compare == 0)
                return mid;
            else if (compare < 0)
                low = mid + 1;
            else
                high = mid - 1;
        }
        return -1;
    }
    public static void main(String[] args) {
        Product[] products = {
                new Product(101, "Laptop", "Electronics"),
                new Product(102, "Mobile", "Electronics"),
                new Product(103, "Mouse", "Accessories"),
                new Product(104, "Printer", "Electronics"),
                new Product(105, "Keyboard", "Accessories")
        };
        int linearResult = linearSearch(products, "Mouse");
        if (linearResult != -1)
            System.out.println("Linear Search Found: "
                    + products[linearResult]);
        Product[] sortedProducts = {
                new Product(105, "Keyboard", "Accessories"),
                new Product(101, "Laptop", "Electronics"),
                new Product(102, "Mobile", "Electronics"),
                new Product(103, "Mouse", "Accessories"),
                new Product(104, "Printer", "Electronics")
        };
        int binaryResult = binarySearch(sortedProducts, "Mouse");
        if (binaryResult != -1)
            System.out.println("Binary Search Found: "
                    + sortedProducts[binaryResult]);
    }
}