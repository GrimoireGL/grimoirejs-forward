export default class VectorArrayContainer{
  public elements:Float32Array;

  constructor(public size:number,public length:number){
    this.resize(size,length);
  }

  public resize(size:number,length:number):void{
    this.elements = new Float32Array(size * length);
    this.size = size; this.length = length;
  }

  public set(index:number,x:number,y?:number,z?:number,w?:number):void{
    const i = this.size * index;
    this.elements[i + 0] = x;
    if(y !== void 0){
      this.elements[i + 1] = y;
      if(z !== void 0){
        this.elements[i + 2] = z;
        if(w !== void 0){
          this.elements[i + 3] = w;
        }
      }
    }
  }

  public incrementLength():void{
    this.resize(this.size,this.length + 1);
  }

  public decrementLength():void{
    this.resize(this.size,this.length - 1);
  }
}
