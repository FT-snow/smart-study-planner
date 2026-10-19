package studyplanner.lessons.lecture12;

// CSC2104.1 · Lecture 12: Methods
// A small study-planner example for this Java concept.

import java.util.ArrayList;
import java.util.List;

public class ResourceLibrary {
    private final List<String> resources = new ArrayList<>();

    public void add(String title) { resources.add(title); }

    public String find(String query) {
        for (String title : resources) {
            if (title.toLowerCase().contains(query.toLowerCase())) return title;
        }
        return "Not found";
    }

    public int count() { return resources.size(); }

    public static void main(String[] args) {
        ResourceLibrary library = new ResourceLibrary();
        library.add("Java constructors guide");
        System.out.println(library.find("constructor") + " · " + library.count() + " item");
    }
}
