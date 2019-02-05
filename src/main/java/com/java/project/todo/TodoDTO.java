package com.java.project.todo;

import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.Size;


public final class TodoDTO {

    private String id;

    @Size(max = Todo.MAX_LENGTH_DESCRIPTION)
    private String description;

    @NotEmpty
    @Size(max = Todo.MAX_LENGTH_TITLE)
    private String title;

    public TodoDTO() {

    }

    public String getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public String getTitle() {
        return title;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return String.format(
                "TodoDTO[id=%s, description=%s, title=%s]",
                this.id,
                this.description,
                this.title
        );
    }
}
