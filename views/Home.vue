<template>
    <section class="home">
        <div>
            <h1>Homepage</h1>
            <h2 @click="$router.push('/about')">About</h2>
            <h2 @click="$router.push('/todos')">TodoApp</h2>
        </div>
    </section>
</template>
