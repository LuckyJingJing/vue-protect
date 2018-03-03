<template>
    <div>
      <router-link to="path" v-for='(item,index) in list' :key='item.id'>
        {{item.title}}
        <app-category v-if='item.subcates && item.subcates.length !=0' :list='item.subcates'></app-category>
      </router-link>
      
    </div>
  </template>
  
  <script>
    export default {
      name:'app-category',
      props:['list']
    }
  </script>
  
  <style>
  </style>
  