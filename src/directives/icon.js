export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value} text-2xl`;

    if (binding.modifiers.right) {
      iconClass += ` float-right`;
    }
    console.log(binding.modifiers);

    if (binding.modifiers.yellow) {
      iconClass += ` text-yellow-400`;
    } else {
      iconClass += ` text-green-400`;
    }

    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
