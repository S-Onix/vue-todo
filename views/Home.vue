<template>
    <section class="home">
        <div>
            <h1>Homepage</h1>
            <h2 @click="$router.push('/about')">About</h2>
            <router-link
                to="/todos"
                tag="h2"
            >TodoApp
            </router-link>
        </div>
    </section>
</template>
