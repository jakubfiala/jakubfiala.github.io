let transparency = 1;
const RESOLUTION_SCALING_FACTOR = 2;

const gl = twgl.getWebGLContext(document.getElementById("snow"));
let programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);

var arrays = {
    position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
};

let bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

twgl.resizeCanvasToDisplaySize(gl.canvas, RESOLUTION_SCALING_FACTOR);
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.useProgram(programInfo.program);
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);

const renderShader = (time) => {

    transparency = Math.abs(transparency) - 0.005 || transparency;

    const uniforms = {
        time: time * 0.001,
        resolution: [gl.canvas.width, gl.canvas.height],
        opacity: 1 - transparency
    };

    twgl.setUniforms(programInfo, uniforms);
    twgl.drawBufferInfo(gl, bufferInfo);
}

export {
    renderShader
}
