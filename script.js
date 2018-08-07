const toppings = [{
  // name: 'Anchovy', // 如果我想改一下咸鱼的名字 我只需要改这里就可以了
  name: '咸鱼', // 我们再回到 slack 去
  labelImage: './assets/toppings/anchovy.svg',
  contentImage: './assets/toppings/anchovies.svg'
}, {
  name: 'Bacon',
  labelImage: './assets/toppings/bacon.svg',
  contentImage: './assets/toppings/bacons.svg',
}, {
  name: 'Basil',
  labelImage: './assets/toppings/basil.svg',
  contentImage: './assets/toppings/basils.svg',
}, {
  name: 'Chili',
  labelImage: './assets/toppings/chili.svg',
  contentImage: './assets/toppings/chilies.svg',
}, {
  name: 'Mozzarella',
  labelImage: './assets/toppings/mozzarella.svg',
  contentImage: './assets/toppings/mozzarellas.svg',
}, {
  name: 'Mushroom',
  labelImage: './assets/toppings/mushroom.svg',
  contentImage: './assets/toppings/mushrooms.svg',
}, {
  name: 'Olive',
  labelImage: './assets/toppings/olive.svg',
  contentImage: './assets/toppings/olives.svg',
}, {
  name: 'Onion',
  labelImage: './assets/toppings/onion.svg',
  contentImage: './assets/toppings/onions.svg',
}, {
  name: 'Pepper',
  labelImage: './assets/toppings/pepper.svg',
  contentImage: './assets/toppings/peppers.svg',
}, {
  name: 'Pepperoni',
  labelImage: './assets/toppings/pepperoni.svg',
  contentImage: './assets/toppings/pepperonis.svg',
}, {
  name: 'Peppers',
  labelImage: './assets/toppings/peppers.svg',
  contentImage: './assets/toppings/pepperss.svg',
}, {
  name: 'Sweetcorn',
  labelImage: './assets/toppings/sweetcorn.svg',
  contentImage: './assets/toppings/sweetcorns.svg',
}];

const selectedToppings = [];

function initializeToppingsChoiceForm() {
  // 我们把这些东西抽象出去，这样更易于维护
  const toppingsChoiceForm = document.getElementById('toppingsChoiceForm');
  // 用 JS 去生成 topping choice form，让 JS 去写 HTML
  // https://www.w3schools.com/jsref/met_node_appendchild.asp
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement#Web_component_example
  // 这里我将会用 ES6 解构 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  // toppings.forEach(topping => {
  toppings.forEach(({ labelImage, name }) => {
    // 去 slack 上打个 1
    const img = document.createElement('img');
    img.src = labelImage;
    img.alt = name;

    const span = document.createElement('span');
    span.innerText = name;

    const button = document.createElement('button');
    button.className = 'topping';
    button.type = 'button'; // 如果不给 button type 的话，浏览器可能会以为他是一个 submit button，从而触发 submit 操作，这是我们不希望的
    // 我们这里就需要把 id 设置上
    button.id = name;
    button.appendChild(img);
    button.appendChild(span);

    // 我们要给 button 添加功能了，button 被点击的时候做一些神奇的操作
    // ok 它不是, 它是一个赋值
    // button.onclick = onToppingClicked;
    // 我写个高阶函数，让大家看一下好的是什么样子的
    button.onclick = enhancedOnToppingClicked(name);

    toppingsChoiceForm.appendChild(button);
  });
}

function enhancedOnToppingClicked(toppingId) {
  return function () {
    const isSelected = selectedToppings.includes(toppingId);
    if (isSelected) {
      const index = selectedToppings.indexOf(toppingId);
      selectedToppings.splice(index, 1);
      return; // 注意这里，如果isSelectd了，操作完成后就直接返回了，告诉代码不要继续往下跑了，节省内存
    }

    // 只有在没有 return 的时候才会跑到这里，也就是没有 isSelected
    selectedToppings.push(toppingId);
  }
}

function onToppingClicked() {
  // 我们现在创建一个数组，用来保存已经选中的 toppings
  // 我们看一下浏览器给了我们什么东西让我们方便操作
  // this 是这个 button 元素，我们现在需要从 button 元素里面提取到他的名字（或者id），让我们能够将 topping 添加到我们的数组里面去
  // 我们尝试用id
  const toppingId = this.id;
  // 做一个小小的判断。如果已经在 selectedToppings 就把它移出去， 如果没有的话就添加进去
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
  const isSelected = selectedToppings.includes(toppingId);
  if (isSelected) {
    // https://www.w3schools.com/howto/howto_js_remove_class.asp
    // 想错东西了，sorry
    // this.classList.remove('active');
    // https://stackoverflow.com/questions/5767325/how-do-i-remove-a-particular-element-from-an-array-in-javascript
    const index = selectedToppings.indexOf(toppingId);
    selectedToppings.splice(index, 1);
  } else {
    // https://www.w3schools.com/howto/howto_js_add_class.asp
    // this.classList.add('active');
    selectedToppings.push(toppingId); // 又写错，sorry
  }

  // 一切ok，我们去slack上
}

window.addEventListener('DOMContentLoaded', () => {
  // 这样别人看到这一段代码就知道我现在在干什么，如果另外一个人要维护的话，他就知道去哪里维护toppingsChoiceForm了
  initializeToppingsChoiceForm();
});