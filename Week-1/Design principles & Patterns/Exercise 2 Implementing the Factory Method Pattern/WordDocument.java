package exercise2_factorymethod;

public class WordDocument implements Document {
    @Override
    public void open() {
        System.out.println("Opening Word Document");
    }
}