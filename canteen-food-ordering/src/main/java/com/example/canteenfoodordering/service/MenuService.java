package com.example.canteenfoodordering.service;


import com.example.canteenfoodordering.model.Menu;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class MenuService {

    public List<Menu> getMenu() {

        List<Menu> menuItems = new ArrayList<>();
        menuItems.add(new Menu(1L, "Idli", "Idli with sambar.", 40.0));
        menuItems.add(new Menu(2L, "Dosa", "Masala dosa .", 50.0));
        menuItems.add(new Menu(3L, "Paneer", "Kadhai paneer.", 150.0));
        menuItems.add(new Menu(4L, "Paratha", "Aaloo paratha.", 80.0));
        menuItems.add(new Menu(5L, "Dal fry", "Tadka Dal.", 70.0));

        return menuItems;
    }
}
