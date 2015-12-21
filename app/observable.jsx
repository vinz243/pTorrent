interface Observable {
	function on(event: string, callback: function): void,
	function fire(event: string, data: variant): void,

}
export default Observable; 