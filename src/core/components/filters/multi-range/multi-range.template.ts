const MULTI_RANGE_TEMLATE =  `<div class="multi-range__wrapper">
                                <div class="multi-range__track-wrapper">
                                  <div class="multi-range__inverse-left" style="width:70%;"></div>
                                  <div class="multi-range__inverse-right" style="width:70%;"></div>
                                  <div class="multi-range__track" style="left:0%;right:0%;"></div>
                                  <span class="multi-range__thumb" style="left:0%;"></span>
                                  <span class="multi-range__thumb" style="left:100%;"></span>
                                </div>
                                <input type="range" value="0" max="100" min="0" step="1" class="multi-range__range">
                                <input type="range" value="100" max="100" min="0" step="1" class="multi-range__range">
                              </div>`;

export default MULTI_RANGE_TEMLATE;